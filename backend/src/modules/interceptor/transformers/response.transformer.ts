import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

interface CustomResponse<T> {
  data: T;
}

@Injectable()
export class ResponseTransformer<T>
  implements NestInterceptor<T, CustomResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<CustomResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        // can modify the response here if needed in the future
        return data;
      }),
    );
  }
}
