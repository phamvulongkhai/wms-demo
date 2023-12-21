<!-- 5. Nghiên cứu NestJS: liệt kê các phần đã nghiên cứu và note lại hiểu được những gì -->

- Nest có CLI (command line interface)

- Controllers:
  - controller chịu trách nhiệm xử lý request và ra về response.
  - sử dụng decorator @Controller
- Services:
  - để nhận và xử lý, lưu trữ dữ liệu của controller
  - sử dụng decorator @Injectable()
- Providers:
  - sử dụng để "cung cấp" services, repositories, factories cho controller, hoặc service khác.
  - sử dụng decorator @Injectable()
- dependency injection:
  - Dùng để create và inject service vào Controller hoặc các services để sử dụng.
  - declare like this: constructor(private catsService: CatsService) {}
  - sử dụng decorator @Injectable()
- Scopes:
  - Singleton Scope:
    Ai được được inject thì sẽ có 1 cái mà sài controller hay service, Nếu controller inject vào controller A và service A (Chung module A) thì nó chỉ new 1 instance. A single instance of the provider is shared across the entire application. Tức là mỗi provider sẽ có 1 instances. cái instance là một provider (ví dụ providers logger)
  - Request Scope:
    Mỗi lần một HTTP request được nhận, một instance mới của provider sẽ được tạo.
    Khi request kết thúc, instance của provider này sẽ bị hủy bỏ. giống Singleton scope nhưng mỗi khi request DONE thì instance cũng hủy theo. A new instance of the provider is created exclusively for each incoming request. Tức là mỗi provider sẽ có 1 instance, sau khi request kết thúc thì instance bị xóa
  - Transient Scope:
    In a TRANSIENT scope, a new instance will be created for every controller or service where we’re using it (Mỗi service hoặc controller đều có instance RIÊNG, không sài chung). Transient providers are not shared across consumers. Each consumer that injects a transient provider will receive a new. Từ consumer ở đây có nghĩa là service hoặc controller.
- Custom provider:

  - The useClass:
    syntax allows you to dynamically determine a class that a token should resolve to. For example, suppose we have an abstract (or default) ConfigService class. Depending on the current environment, we want Nest to provide a different implementation of the configuration service. The following code implements such a strategy.
    <!-- const configServiceProvider = {
    provide: ConfigService,
    useClass:
    process.env.NODE_ENV === 'development'
    ? DevelopmentConfigService
    : ProductionConfigService,
    };

    @Module({
    providers: [configServiceProvider],
    })
    export class AppModule {} -->

  - useValue: cung cấp giá trị cụ thể như object, number, boolean, function....
  - The useFactory:
    option is useful when you need to customize the instantiation process of a service, especially when you have dependencies that need to be injected during the creation of the service instance. It allows you to perform additional logic or configuration before creating and returning the instance.
    import { Module } from '@nestjs/common';
    <!-- import { SomeService } from './some.service';
    import { DependencyService } from './dependency.service';

    @Module({
    providers: [
        DependencyService,
        {
        provide: SomeService,
        useFactory: (dependencyService: DependencyService) => {
            // Perform some logic or configuration
            const configValue = dependencyService.getConfigValue();

            // Create and return an instance of SomeService
            return new SomeService(configValue);
        },
        inject: [DependencyService], // Specify the dependencies that should be injected into the factory function
        },
    ],
    })
    export class AppModule {} -->

- Module

  - Sử dụng @Module() decorator.
  - Module có các thành phần: controlller, providers, imports (module) , exports (module, service)
  - Dynamic module: là tạo module thông qua một func thay vì module decorator (sẽ linh hoạt hơn, khi cần có thể tạo)
  - forRoot là cái không thay đổi (config database hoặc cái gì đó chung.), còn forFeature là cái thay đổi (config riêng cho từng module con)
  - @Global() decorator: sử dụng để đánh dấu đó là module được sử dụng ở mọi nơi mà không cần phải import từ từ.

- Middleware:

  - là một func được gọi trước khi request chạm đến controller.
  - nó có thể thực thi bất kì khối code nào.
  - có thể thay đổi request
  - gọi next() để kết thúc middleware và chuyển tiếp. nếu không gọi nó sẽ bị treo
  - sử dụng @Injectable() decorator.
  - có thể sử dụng global middleware.
  - thường sử dụng để xác thực người dùng.

- Exceptions:

  - dùng để sử lý những "ngoại lệ"
  - HTTP exception.
  - example: throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

- Pipes:

  - sử dụng @Injectable() decorator.
  - Có 2 loại:
    - transformation: transform input data to the desired form
    - validation: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception
    - scope: global, controller, router, parameter.

- Guards:

  - scope: route, global, controller
  - guard implements CanActivate interface.
  - Guards have a single responsibility. They determine whether a given request will be handled by the route handler or not, depending on certain conditions (thường dùng để author - phân quyền)

- Interceptors:
  - scope: route, global, controller
  - sử dụng @Injectable() decorator, implements NestInterceptor interface.
  - In the interceptor, we can do any processes and modify the request before it’s sent to the server
  - We can mutate the response after it has passed through the route handler
  - Tức là có thể trực tiếp truy cập, sửa đổi vào request trước khi nó đến router, và response.
    ![Alt text](photo_2023-12-18_01-45-14.jpg)
