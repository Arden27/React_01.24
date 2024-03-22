class Animal {
  #name
  constructor(name){
    this.#name = name
  }

  get name() {
    return this.#name 
  }

  set name(newName) {
    this.#name = newName
  }
}



class Dog extends Animal {
  #sound
  constructor(name, sound){
    super(name)
    this.#sound = sound
  }

  voice() {
    console.log(`${this.#sound}!!! My name is ${this.name}`)
  }
}
const creature = new Animal('body')

const chak = new Dog('Chakie', 'whooo')

console.log(chak)
console.log(chak.name)
chak.name = "Buddy"
chak.voice()

const obj = Object.create({a: 50}, {
  b: {
    value: 20,
    enumerable: true
  }
})

console.log(obj)

const obj2 = Object.assign(obj, {
  c: 20
})

console.log("obj2", obj2)



Object.defineProperty(obj2, 'd', {
  value: 100,
  enumerable: true
})

console.log(Object.getOwnPropertyDescriptors(obj2))