export class Person {
  constructor(
    public name: string = '',
    public surName: string = '',
    public middleName: string = ''
  ) {}
}

interface myFn<T> {
  (name: string, surname: string, middleName?: string): T;
}

let impMyFn: myFn<string>;

impMyFn = (inputName: string, inputSurname: string, middleName?: string) => {
  console.log(inputName);

  return inputName + ' ' + (middleName ? middleName + ' ' : '') + inputSurname;
};

export { impMyFn };
