class ShipInPort extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
  constructor() {
    super('shipInPorts')
    this.fields = this.fields.concat(['shipId', 'portId'])
  }
}
