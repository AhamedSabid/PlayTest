import { Page } from '@playwright/test';

export class RegisterPage {
  constructor(private page: Page) {}

  // Locators
  private firstNameInput     = () => this.page.locator('input[ng-model="FirstName"]');
  private lastNameInput      = () => this.page.locator('input[ng-model="LastName"]');
  private addressTextarea    = () => this.page.locator('textarea[ng-model="Adress"]');
  private emailInput         = () => this.page.locator('input[ng-model="EmailAdress"]');
  private phoneInput         = () => this.page.locator('input[type="tel"]');
  private genderMale         = () => this.page.locator('input[value="Male"]');
  private genderFemale       = () => this.page.locator('input[value="FeMale"]');
  private hobbyCricket       = () => this.page.locator('input[value="Cricket"]');
  private hobbyMovies        = () => this.page.locator('input[value="Movies"]');
  private hobbyHockey        = () => this.page.locator('input[value="Hockey"]');
  private languagesInput     = () => this.page.locator('#msdd');
  private skillsDropdown     = () => this.page.locator('#Skills');
  private countryDropdown    = () => this.page.locator('#country');
  private dobYear            = () => this.page.locator('#yearbox');
  private dobMonth           = () => this.page.locator('select').nth(4);
  private dobDay             = () => this.page.locator('#daybox');
  private passwordInput      = () => this.page.locator('#firstpassword');
  private confirmPasswordInput = () => this.page.locator('#secondpassword');
  private submitButton       = () => this.page.getByRole('button', { name: 'Submit' });

  async navigate() {
    await this.page.goto('https://demo.automationtesting.in/Register.html');
  }

  async fillName(firstName: string, lastName: string) {
    await this.firstNameInput().fill(firstName);
    await this.lastNameInput().fill(lastName);
  }

  async fillAddress(address: string) {
    await this.addressTextarea().fill(address);
  }

  async fillEmail(email: string) {
    await this.emailInput().fill(email);
  }

  async fillPhone(phone: string) {
    await this.phoneInput().fill(phone);
  }

  async selectGender(gender: 'Male' | 'Female') {
    if (gender === 'Male') {
      await this.genderMale().click();
    } else {
      await this.genderFemale().click();
    }
  }

  async selectHobbies(hobbies: Array<'Cricket' | 'Movies' | 'Hockey'>) {
    for (const hobby of hobbies) {
      if (hobby === 'Cricket') await this.hobbyCricket().click();
      if (hobby === 'Movies')  await this.hobbyMovies().click();
      if (hobby === 'Hockey')  await this.hobbyHockey().click();
    }
  }

  async selectSkill(skill: string) {
    await this.skillsDropdown().selectOption({ label: skill });
  }

  async selectCountry(country: string) {
    await this.countryDropdown().selectOption({ label: country });
  }

  async fillDateOfBirth(day: string, month: string, year: string) {
    await this.dobYear().selectOption(year);
    await this.dobMonth().selectOption(month);
    await this.dobDay().selectOption(day);
  }

  async fillPassword(password: string) {
    await this.passwordInput().fill(password);
    await this.confirmPasswordInput().fill(password);
  }

  async submit() {
    await this.submitButton().click();
  }
}
