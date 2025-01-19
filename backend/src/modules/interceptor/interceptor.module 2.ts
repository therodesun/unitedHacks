import { Global, Module } from '@nestjs/common';
import { ResponseTransformer } from './transformers';

const interceptors = [ResponseTransformer];

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [...interceptors],
  exports: [...interceptors],
})
export class InterceptorModule {}
