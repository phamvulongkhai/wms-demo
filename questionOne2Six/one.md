1. Nghiên cứu về OOP, so sánh chúng (Compare 4 types)

- OOP là mô mình dựa trên concept class và object.
- OOP làm cho app đơn giản, dễ bảo trì, dễ tái sử dụng, dễ bắt lỗi.
- OOP có 4 nguyên tắc: Kế thừa, đa hình, đóng gói, trừu tượng.

* Tính kế thừa liên quan đến việc subclass thừa hưởng các đặc tính của class.
  - Ví dụ: Lớp chó, mèo thừa hưởng lại các đặc điểm của lớp động vật như tiếng kêu, cách di chuyển.
  - Các keywords liên quan: Implements, extends.
  - Class extends class, Class implements interface, interface extends interface
* Tính đa hình.

  - Có nghĩa là các đối tượng khác nhau thực hiện cùng một hành động theo cách khác nhau
  - Ví dụ: Con chó, con cá, con chim cùng thực hiện một hành động di chuyển (kế thừa từ lớp động vật)
    theo 3 cách khác nhau. Con chó đi, con cá bơi, con chim bay. Nhưng tất cả chúng đều di chuyển.
  - Keyword liên quan: override.
  - Override lại phương thức của lớp cha.

* Tính đóng gói.

  - Liên quan đến "phân quyền" truy cập cho các properties, methods.
  - Keyword liên quan: public, protected, private, default (Typescript doesn't have default keyword. if no mention, it will be public)
  - public: access every where
  - protected: access inside class and subclass
  - private: only access indise class

* Tính trừu tượng.
  - Abstraction là cách để giảm sự phức tạp, ẩn các thông tin không cần chi tiết. thông thường chỉ expose các thông tin chung, các tính năng, cần thiết mà KHÔNG implement in detail. Các subclass sẽ implement in detail.
  - Keyword liên quan: abstract class, interface.
