2. Nghiên cứu về SOLID, so sánh chúng

- SOLID là viết tắt của 5 nguyên tắc thiết kế hướng đối tượng:
- 5 nguyên tắc là:

  - S - Single-responsiblity
  - O - Open-closed
  - L - Liskov Substitution
  - I - Interface Segregation
  - D - Dependency Inversion

- Single-responsiblity

  - Định nghĩa: Mỗi class nên một job (reponsibility) duy nhất.
  - Ví dụ: Class square có một job duy nhất liên quan đến square.
    Class calculateArea có một job duy nhất là tính diện tích.
    Nếu calculateArea kiêm thêm nhiệm vụ display area thì nó đã vị phạm nguyên tắc.
    Nên có một displayResult để show kết quả thì hợp lý hơn.

- Open-closed

  - Định nghĩa: Open for mở rộng, nhưng Close for modification (Sửa đổi). Có nghĩa là không nên sửa (changing) code inside class nhưng có thể thêm tính năng (Function). Vì càng sửa thì càng có khả năng xuất hiện bugs, đặc biệt là code đã được tested.
  - Ví dụ: ta có method save() trong class ItemPersistence liên quan đến việc xử lý lưu trữ.
  - Ta không nên sửa code trong save() khi ta có một yêu cầu mới như lưu file, insert vào database, hay insert vào db thứ 2.
  - Ta nên mở rộng (extent) nó ra thay vì sửa trực tiếp save().
  - Các làm: nên có 2 classes file và database cùng implement save() method in interface ItemPersistence.
  - Ta sẽ có 2 method save() riêng biệt để làm nhiện vụ riêng biệt. Do đó ta không phải modify method save() ban đầu

- Liskov Substitution

  - Định nghĩa: Nếu B là subclass của A, thì A có thể "thay thế" B.
  - Ví dụ: Lớp vịt là subclass của lớp chim, thì lớp chim có thể thay thế lớp vịt.
    Tức là vịt có thể thực hiện được mọi hành động (ví dụ fly) của lớp chim mà không gặp bug.
  - Ví dụ về vi phạm nguyên tắc: Ta có lớp cánh cụt, mặc dù cánh cụt vấn thuộc lớp chim.
    Nhưng chim cánh cụt không thể bay, do đó nếu nó kế thừa fly() từ lớp chim thì ta đã vi phạm nguyên tắc. Do đó, nên cánh cụt là con của lớp chim không bay và chim không bay là lớp con của chim.
    ![![Alt text]](liskovSubstitution.png)

- Interface Segregation

  - Định nghĩa: Giống như tên gọi, chia interface thành từng phần.
  - Những inteface cụ thể TỐT hơn một interface tổng quát.
  - Ví dụ về sự phi phạm: Nếu một class phải implements những methods mà nó không dùng đến.

- Dependency Inversion
  - Định nghĩa: Class nên phụ thuộc một abstract class hoặc interface. Không phụ thuộc vào một class cụ thể (đã implement).
  - Ví dụ: Lớp vịt cha và lớp vịt con nên phụ thuộc vào lớp chim hoặc interface chim. Lớp vịt con không nên phụ thuộc vào lớp vịt cha (lớp đã được implement từ lớp chim hoặc interface chim)
