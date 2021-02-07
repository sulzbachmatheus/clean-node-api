import { AddAccountRepository } from '../../protocols/add-account-repository'
import { AddAccount, AddAccountModel, Encrypter, AccountModel } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    // Object.assign: using the same object that I have as a method parameter but changing the password property to use the hashed variable above
    // using '{}' as first parameter I ensure that I am creating another object based on the previous one received by parameter
    await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return await new Promise(resolve => resolve(null))
  }
}
