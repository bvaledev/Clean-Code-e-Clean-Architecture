import { Segment } from "../Segment";

export default interface FareCalculator {
  calculate(segmento: Segment): number;
}
