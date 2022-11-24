import FareCalculator from "./IFareCalculator";
import { Segment } from "../Segment";

export class SpecialDayFareCalculator implements FareCalculator {
  FARE = 1.5

  calculate(segment: Segment): number {
    return segment.distance * this.FARE
  }
}
