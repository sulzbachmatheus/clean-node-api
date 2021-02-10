export interface Encrypter {
  // async signature not allowed on interfaces, only allowed in the method implementations (concrete classes)
  encrypt: (value: string) => Promise<string>
}
