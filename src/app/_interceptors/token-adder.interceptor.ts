import { HttpInterceptorFn } from '@angular/common/http';

export const tokenAdderInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("backEndToken") as string;
  const excludedPaths = ['/login'];

  const isExcluded = excludedPaths.some(path => req.url.includes(path));
  if (token && !isExcluded) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
