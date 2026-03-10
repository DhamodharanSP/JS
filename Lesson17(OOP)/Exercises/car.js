class Car
{
    brand;
    model;
    speed;
    isTrunkOpen;
    constructor(carDetails)
    {
        this.brand = carDetails.brand;
        this.model = carDetails.model;
        this.speed = 0;
        this.isTrunkOpen = false;
    }

    displayInfo()
    {
        console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h. Truck ${this.isTrunkOpen ? 'Opened' : 'Closed'}.`);
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
    }
].map((carDetails) => new Car(carDetails));

// 17c.
cars[0].go();
cars[0].go();
cars[0].go();

cars[2].go();
cars[2].go();

// 17d.
cars[1].openTrunk();
cars[3].openTrunk();

cars.forEach((car) => car.displayInfo());