import { NormalFareCalculatorHandler } from "../../../src/ride/3/StrategyChainOfResponsabilityFareCalculator/NormalFareCalculatorHandler";
import { OvernightFareCalculatorHandler } from "../../../src/ride/3/StrategyChainOfResponsabilityFareCalculator/OvernightFareCalculatorHandler";
import { OvernightSundayFareCalculatorHandler } from "../../../src/ride/3/StrategyChainOfResponsabilityFareCalculator/OvernightSundayFareCalculatorHandler";
import { SpecialDayFareCalculatorHandler } from "../../../src/ride/3/StrategyChainOfResponsabilityFareCalculator/SpecialDayFareCalculatorHandler";
import { SundayFareCalculatorHandler } from "../../../src/ride/3/StrategyChainOfResponsabilityFareCalculator/SundayFareCalculatorHandler";
import { Ride } from "../../../src/ride/3/Ride";


describe('RideClass', () => {
  let ride: Ride

  beforeEach(() => {
    const normalFareCalculator = new NormalFareCalculatorHandler()
    const overnightFareCalculator = new OvernightFareCalculatorHandler(normalFareCalculator)
    const overnightSundayFareCalculator = new OvernightSundayFareCalculatorHandler(overnightFareCalculator)
    const sundayFareCalculator = new SundayFareCalculatorHandler(overnightSundayFareCalculator)
    const specialDayFareCalculator = new SpecialDayFareCalculatorHandler(sundayFareCalculator)
    ride = new Ride(specialDayFareCalculator)
  })

  test("should calculate a ride on the first day of the month", function () {
    ride.addSegment(10, new Date("2021-03-01T10:00:00"))

    expect(ride.calculateFare()).toBe(15);
  });

  test("should calculate a day ride not sunday", function () {
    ride.addSegment(10, new Date("2021-03-02T10:00:00"))

    expect(ride.calculateFare()).toBe(21)
  });

  test("Deve calcular uma corrida noturna", function () {
    ride.addSegment(10, new Date("2021-03-02T23:00:00"))

    expect(ride.calculateFare()).toBe(39);
  });

  test("Deve calcular uma corrida diurna no domingo", function () {
    ride.addSegment(10, new Date("2021-03-07T10:00:00"))

    expect(ride.calculateFare()).toBe(29);
  });

  test("Deve calcular uma corrida noturna no domingo", function () {
    ride.addSegment(10, new Date("2021-03-07T23:00:00"))

    expect(ride.calculateFare()).toBe(50);
  });

  test("Não deve calcular uma corrida com distância inferior a zero", function () {

    expect(() => {
      ride.addSegment(-10, new Date("2021-03-01T10:00:00"))
      ride.calculateFare()
    }).toThrow(new Error("Invalid distance"));
  });

  test("Não deve calcular uma corrida com data inválida", function () {

    expect(() => {
      ride.addSegment(10, new Date("abcdef"))
      ride.calculateFare()
    }).toThrow(new Error("Invalid date"));
  });

  test("Deve calcular uma corrida com valor mínimo", function () {
    ride.addSegment(3, new Date("2021-03-01T10:00:00"))

    expect(ride.calculateFare()).toBe(10);
  });
})
