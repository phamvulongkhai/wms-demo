## Backend Training

1. Nghiên cứu về OOP, so sánh chúng (Compare 4 types)

2. Nghiên cứu về SOLID, so sánh chúng (Compare S, O, L, I, D)

3. Nghiên cứu về Typescript

- Data Types
- Classes
- Decorators
- Access Modifiers and Properties
- Static and Instance Members
- Function Overloading
- Constructors
- Inheritance
- Interfaces
- Modules

4. So sánh Typescript và Javascript

5. Nghiên cứu NestJS: liệt kê các phần đã nghiên cứu và note lại hiểu được những gì

6. Nghiên cứu về Mongodb: cách hoạt động của index

7. Sử dụng Nestjs + Mongoose để dựng một trang WMS đơn giản

- Các entity:

  - User: người dùng hệ thống
  - Item: thông tin các sản phẩm cần quản lý
  - Inbound Order: đơn hàng nhập kho, sẽ có 2 status là NEW, CANCEL và COMPLETED
  - Outbound Order: đơn hàng xuất kho, sẽ có 2 status là NEW, CANCEL và COMPLETED

- Yêu cầu tính năng

  - User

    - Cho phép add user vào hệ thống
    - Cho phép user đăng nhập hệ thống
    - Nâng cao: xử lý authentication với jwt (No need to do authorization)

  - Item

    - Cho phép user create, read, update sản phẩm
    - Cho phép user delete sản phẩm nếu sản phẩm đó chưa được lên đơn hàng nào (In complete and new status)
    - Cho phép user list sản phẩm
    - Nâng cao: search sản phẩm theo sku, name
    - Nâng cao: hiển thị tồn kho và tồn kho khả dụng của sản phẩm. Công thức sẽ ở bên dưới

  - Inbound Order

    - Cho phép user create đơn hàng nhập, cho phép chọn nhiều sản phẩm với số lượng khác nhau
    - Cho phép user update, delete đơn hàng nhập khi ở trạng thái NEW
    - Cho phép user list đơn hàng nhập
    - Cho phép user chuyển status đơn sang COMPLETED
    - Nâng cao: filter đơn hàng nhập theo status, search theo mã đơn

  - Outbound Order
    - Cho phép user create đơn hàng xuất, cho phép chọn nhiều sản phẩm với số lượng khác nhau
    - Cho phép user update, delete đơn hàng xuất khi ở trạng thái NEW
    - Cho phép user list đơn hàng xuất
    - Cho phép user chuyển status đơn sang COMPLETED
    - Nâng cao: filter đơn hàng xuất theo status, search theo mã đơn
    - Nâng cao: chỉ được tạo đơn hàng khi các sản phẩm còn đủ số lượng tồn kho khả dụng

- Công thức tính tồn kho: Sẽ dựa vào số lượng sản phẩm được thêm vào các đơn hàng

  - Tồn kho sản phẩm (Quantity) = Tổng đơn hàng nhập với status COMPLETED - tổng đơn xuất COMPLETED + tổng đơn nhập NEW
  - Tồn kho khả dụng sản phẩm (Quantity) = Tổng đơn hàng nhập với status COMPLETED - tổng đơn xuất COMPLETED - tổng đơn xuất NEW

- Yêu cầu về code

  - Cần có lớp DTO để validation (Nestjs có hỗ trợ)
  - Nhớ nguyên tắc SOLID, đặc biệt là single responsibility principle

- Khác
  - Không cần dựng UI, chỉ cần test qua Postman

---

Note:

- Tạo một github repository để làm bài tập
- Push code hàng ngày
- Thời gian tối đa: 2 tuần
