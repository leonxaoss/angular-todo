export class HelpClass {
  static timer: any;
  static debounce(fn = () => {}, timeout = 500): void{
    if (HelpClass.timer) {
      clearTimeout(HelpClass.timer);
      HelpClass.timer = null;
    }
    HelpClass.timer = setTimeout(fn, timeout);
  }
}
