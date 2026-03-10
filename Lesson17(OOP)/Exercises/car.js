class Car
{
    #brand;
    model;
    speed = 0;
    isTrunkOpen = false;
    topSpeed = 200;
    constructor(carDetails)
    {
        this.#brand = carDetails.brand;
        this.model = carDetails.model;
    }

    displayInfo()
    {
        console.log(`${this.#brand} ${this.model}, Speed: ${this.speed} km/h.${this.isTrunkOpen === true ? ' Truck Opened' : this.isTrunkOpen === false ? ' Truck Closed' : ''}`);
    }

    go()
    {
        if(!this.isTrunkOpen && this.speed + 5 <= 200)
            this.speed += 5;
    }

    brake()
    {
        if(this.speed - 5 >= 0)
            this.speed -= 5;
    }

    openTrunk()
    {
        if(this.speed == 0) this.isTrunkOpen = true;
    }

    closeTrunk()
    {
        this.isTrunkOpen = false;
    }
}

class RaceCar extends Car
{
    acceleration;
    constructor(carDetails)
    {
        super(carDetails);
        this.topSpeed = 300;
        this.acceleration = carDetails.acceleration;
        this.isTrunkOpen = 'None';
    }

    go()
    {
        if(this.speed + this.acceleration <= this.topSpeed)
            this.speed += this.acceleration;
    }

    openTrunk()
    {
        console.log(`Race cars don't have trunks`);
    }

    closeTrunk()
    {
        console.log(`Race cars don't have trunks`);
    }
}

const cars = [
    {
        brand: 'Toyota',
        model: 'Corolla'
    },
    {
        brand: 'Tesla',
        model: 'Model 3'
    },
    {
        brand: 'Audi',
        model: 'A3'
    },
    {
        brand: 'BMW',
        model: 'M4'
    },
    {
        brand: 'McLaren',
        model: 'F1',
        acceleration: 20
    }
].map((carDetails) => {
    if(carDetails.acceleration) return new RaceCar(carDetails);
    return new Car(carDetails)
});

console.log(cars);

// 17c.
cars[0].go();
cars[0].go();
cars[0].go();

cars[2].go();
cars[2].go();

// 17d.
cars[1].openTrunk();
cars[3].openTrunk();

// 17e.
cars[4].go();
cars[4].go();
cars[4].go();
cars[4].go();
cars[4].go();

cars.forEach((car) => car.displayInfo());