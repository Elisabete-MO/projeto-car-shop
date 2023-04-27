class Car {
  private value: string;
  private owner: string;
  private type: string;
  private id: string | undefined;

  constructor(
    value: string,
    owner: string,
    type: string,
    id: string | undefined,
  ) {
    this.value = value;
    this.owner = owner;
    this.type = type;
    this.id = id;
  }

  public getValue() {
    return this.value;
  }

  public setValue(value: string) {
    this.value = value;
  }

  public getOwner() {
    return this.owner;
  }

  public setOwner(carOwner: string) {
    this.owner = carOwner;
  }

  public getType() {
    return this.type;
  }

  public setType(type: string) {
    this.type = type;
  }
}

export default Car;
