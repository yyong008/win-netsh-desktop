import * as os from 'node:os'
import sudo from 'sudo-prompt'
// import { promisify } from 'node:util'
import { exec } from 'node:child_process'
import { shell } from 'electron'

function promisify(fn: typeof exec) {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  return function (...args: unknown[]) {
    return new Promise((resolve, reject) => {
      fn(...args, (err: any, result: unknown) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}

const asyncExec = promisify(exec)

const options = {
  name: 'Electron'
}

type IItem = {
  name: string
  address: string
}

export type IfacesObj = {
  ipv4: IItem[]
  ipv6: IItem[]
}

export function openDefaultBrowser(url: string): void {
  shell.openExternal(url)
}

function toLines(text: string): string[] {
  return text.split(/\r\n|\r|\n/)
}

function toWords(text: string): string[] {
  return text.split(/ +/)
}

export function getIps(): IfacesObj {
  const ifacesObj: IfacesObj = {
    ipv4: [],
    ipv6: []
  }

  const interfaces = os.networkInterfaces()

  for (const name in interfaces) {
    interfaces[name]!.forEach(function (details) {
      const { address } = details
      if (!details.internal) {
        switch (details.family) {
          case 'IPv4':
            ifacesObj.ipv4.push({ name, address })
            break
          case 'IPv6':
            ifacesObj.ipv6.push({ name, address })
            break
        }
      }
    })
  }
  return ifacesObj
}

export async function list(cb: (p: unknown) => unknown): Promise<void> {
  exec('chcp 65001 | netsh interface portproxy show all', (err, stdout) => {
    if (err) {
      console.log(err)
    }
    const len = toLines(stdout).length
    const maps = toLines(stdout)
      .slice(5, len - 2)
      .map((l) => {
        const ws = toWords(l)
        return { fromAddr: ws[0], fromPort: ws[1], toAddr: ws[2], toPort: ws[3] }
      })
    const devs = getIps()
    const result = { devs: devs, maps: maps }
    cb(result)
  })
}

export type IResultData = {
  devs: IfacesObj
  maps: any[]
}

export async function unstable_list(): Promise<IResultData> {
  const devs = getIps()
  const result: IResultData = { devs, maps: [] }

  try {
    const stdout = (await asyncExec(
      'chcp 65001 | netsh interface portproxy show all'
    )) as unknown as string
    const len = toLines(stdout).length
    const maps = toLines(stdout)
      .slice(5, len - 2)
      .map((l) => {
        const ws = toWords(l)
        return { fromAddr: ws[0], fromPort: ws[1], toAddr: ws[2], toPort: ws[3] }
      })
    result.maps = maps
    // 操作成功
  } catch (error) {
    // 操作失败
    console.log(error)
  }
  return result
}

export async function listall(cb: (p: unknown) => unknown): Promise<void> {
  exec('chcp 65001 | netsh interface portproxy show all', (err, stdout) => {
    if (err) {
      console.log(err)
    }

    const maps = toLines(stdout)
      .filter((l) => {
        return l[0] >= '0' && Number(l[0]) <= 9
      })
      .map((l) => {
        const ws = toWords(l)
        return { fromAddr: ws[0], fromPort: ws[1], toAddr: ws[2], toPort: ws[3] }
      })
    const devs = getIps()
    const result = { devs: devs, maps: maps }
    cb(result)
  })
}

export function add(
  { fromAddr, fromPort, toAddr, toPort }: any,
  cb: (arg0: string | Buffer | undefined) => void
): void {
  sudo.exec(
    'netsh interface portproxy add v4tov4 listenport=' +
      fromPort +
      ' listenaddr=' +
      fromAddr +
      ' connectport=' +
      toPort +
      ' connectaddr=' +
      toAddr,
    options,
    (err, stdout, stderr) => {
      if (err) {
        console.log(err)
      }

      if (stderr) {
        console.log('stderr', stderr)
      }
      cb(stdout)
    }
  )
}

export function change(
  oldMap: { fromPort: string; fromAddr: string },
  newMap: { fromPort: string; fromAddr: string; toPort: string; toAddr: string },
  cb: () => void
) {
  sudo.exec(
    'netsh interface portproxy delete v4tov4 listenport=' +
      oldMap.fromPort +
      ' listenaddr=' +
      oldMap.fromAddr +
      ' & netsh interface portproxy add v4tov4 listenport=' +
      newMap.fromPort +
      ' listenaddr=' +
      newMap.fromAddr +
      ' connectport=' +
      newMap.toPort +
      ' connectaddr=' +
      newMap.toAddr,
    options,
    (err) => {
      if (err) {
        console.log(err)
      }
      cb()
    }
  )
}

export function remove({ fromAddr: addr, fromPort: port }: any, cb: () => void) {
  sudo.exec(
    'netsh interface portproxy delete v4tov4 listenport=' + port + ' listenaddr=' + addr,
    options,
    (err) => {
      if (err) {
        console.log(err)
      }
      cb()
    }
  )
}

export function getFirewallByName(name: any, cb: (arg0: any[]) => void) {
  sudo.exec(`netsh advfirewall firewall show rule name="${name}"`, options, (err, stdout) => {
    if (err) {
      console.log(err)
    }
    const arr: any[] = []
    let arrSub: any[] = []

    const filterArr = toLines(stdout)
      .filter((f) => f !== '')
      .filter((f) => f !== '----------------------------------------------------------------------')
      .filter((f) => f !== 'Ok.')

    filterArr.forEach((i, idx) => {
      const index: number = i.indexOf(':')
      if (i.startsWith('Rule Name:')) {
        idx !== 0 && arr.push(arrSub) // 上一轮，结算
        // 初始化本轮
        arrSub = [
          [
            i.slice(0, index),
            i
              .slice(index + 1, i.length)
              .trimStart()
              .trimEnd()
          ]
        ]
      } else {
        arrSub.push([
          i.slice(0, index),
          i
            .slice(index + 1, i.length)
            .trimStart()
            .trimEnd()
        ])
      }

      // 最后一轮归档
      if (idx === filterArr.length - 1) {
        arr.push(arrSub)
      }
    })

    arrSub = []

    cb(arr)
  })
}

export function exportAddLocalporstPort({ localport, name, protocol }: any, cb: () => void) {
  sudo.exec(
    `netsh advfirewall firewall add rule name="${name}" dir=in action=allow protocol=${protocol} localport=${localport}`,
    options,
    (err) => {
      if (err) {
        console.log(err)
      }
      cb()
    }
  )
}
