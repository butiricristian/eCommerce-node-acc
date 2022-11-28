import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class ProductImage {
  @Prop()
  url: string;

  @Prop()
  width: number;

  @Prop()
  height: number;

  @Prop()
  alt: string;
}
