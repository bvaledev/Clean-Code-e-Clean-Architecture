import FareCalculator from "./IFareCalculator";
import { Segment } from "./Segment";

export class NormalFareCalculator implements FareCalculator {
  FARE = 2.1

  calculate(segment: Segment): number {
    return segment.distance * this.FARE
  }
}
