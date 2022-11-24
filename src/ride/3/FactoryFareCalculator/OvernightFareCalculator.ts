import FareCalculator from "./IFareCalculator";
import { Segment } from "./Segment";

export class OvernightFareCalculator implements FareCalculator {
  FARE = 3.9

  calculate(segment: Segment): number {
    return segment.distance * this.FARE
  }
}
