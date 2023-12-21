<!-- 6. Nghiên cứu về Mongodb: cách hoạt động của index -->

- Indexes support efficient execution of queries in MongoDB. Without indexes, MongoDB must scan every document in a collection to return query results. If an appropriate index exists for a query, MongoDB uses the index to limit the number of documents it must scan.

- Công dụng: query nhanh hơn (dụng dụng giải thuật B tree)
- Index type:

  - Single Field Index: Thường xuyên tìm kiếm employees by id (Một feild)
  - Compound Index: If your application repeatedly runs a query that contains multiple fields (Nhiều feild).
  - Multikey Index: If your application frequently queries a field that contains an array value, a multikey index improves performance for those queries. Example, Documents in a students collection contain a test_scores field: an array of test scores a student received throughout the semester (Queries mảng)
  - Geospatial Index: If your application frequently queries a field that contains geospatial data. (sử dụng cho location, liên quan đến địa lý)
  - Text Index: Documents in an online shop's clothing collection include a description field that contains a string of text describing each item. To find clothes made of silk, create a text index on the description field and run a text search query for documents with the keyword silk. The search returns all documents that mention silk in the description field. (tạo index theo text, dùng để query thoe text cụ thể)
  - Hashed Index: hash value trước khi lưu và tìm kiếm.
  - Wildcard index: Only use wildcard indexes when the fields you want to index are unknown or may change. Wildcard indexes don't perform as well as targeted indexes on specific fields (Dùng cho field có sự thay đổi, dynamic, linh động và không cụ thể feild nào)

- Index properties:

  - Dùng để "lên kế hoạch" để sử dụng query, lưu trữ in dex.
  - Hidden Indexes: Dùng để xem liệu nếu drop index đó thì điều gì xe xảy ra?
  - Partial Indexes: only index the documents in a collection that meet a specified filter expression (có nghĩa là dùng partial index để filter khi query)
  - Sparse Indexes: áp dụng cho những document có index. Nếu không có thì bỏ qua.
  - TTL Indexes: Tự động remove documents trong collection sau một khoảng thời gian.
  - Unique Indexes: These indexes are useful when your documents contain a unique identifier, such as a userId.
    (Nghĩa là không trùng lặp index, nếu trùng thì mongodb sẽ reject)

- Index stratergies:

  - The ESR (Equality, Sort, Range) Rule: (E > S > R)
    - Equality: match một giá trị cụ thể của value (Place fields that require exact matches first in your index.)
    - Sort: dùng để sắp xếp. Sort đi theo sau Equality vì equality giảm số lượng document phải sort.
    - Range: To improve query efficiency, make the range bounds as tight as possible and use equality matches to limit the number of documents that must be scanned. Place the range filter after the sort predicate so MongoDB can use a non-blocking index sort (Tức giới hạn lại phạm vi tìm kiếm)
    * Ghi chú range: In a blocking SORT, all input must be consumed by the sort step before it can produce output. In a non-blocking, or indexed sort, the sort step scans the index to produce results in the requested order.
  - Ensure Indexes Fit in RAM:
    - use the db.collection.totalIndexSize() - check size.
    - To ensure this index fits in RAM, you must not only have more than that much RAM available but also must have RAM available for the rest of the working set.
    - If you have and use multiple collections, you must consider the size of all indexes on all collections. The indexes and the working set must be able to fit in memory at the same time. (So important)
  - Create Queries that Ensure Selectivity:
    - To ensure selectivity, write queries that limit the number of possible documents with the indexed field. Write queries that are appropriately selective relative to your indexed data.

- Additional Considerations:
  - Inequality operators such as $ne or $nin are range operators, not equality operators.
  - $regex is a range operator.
  - $in can be an equality operator or a range operator. When $in is used alone, it is an equality operator that does a series of equality matches. $in acts like a range operator when it is used with .sort().
- Nhược điểm:

  - Extra Overhead: Nếu không thường xuyên "read" data thì không nên dùng index. Every index occupies some space as well as causes an overhead on each insert, update and delete.
  - RAM Usage: indexes are stored in RAM, If the total size increases the RAM size, it will start deleting some indexes, causing performance loss. Nên chú ý !!!

- Không thể sửa index, ta phải xóa rồi tạo lại.
<!-- - https://www.mongodb.com/docs/manual/reference/indexes/ -->
