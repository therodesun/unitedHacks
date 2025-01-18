import { Global, Module } from '@nestjs/common';
import { CustomValidationPipe } from './pipes';

const pipes = [CustomValidationPipe];

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [...pipes],
  exports: [...pipes],
})
export class ValidationModule {}
