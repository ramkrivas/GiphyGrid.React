
export const css = (strings:any, ...args:any) =>
  strings.reduce(
    (acc:string, string:string, index:number) =>
      acc + string + (index < args.length ? args[index] : ''),
    '',
  )
