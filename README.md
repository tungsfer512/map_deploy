# Map

Các công nghệ được sử dụng trong dự án: [ExpressJS](https://expressjs.com/), [ReactJS](https://react.dev/), [Material UI](https://mui.com/), [PostgreSQL](https://www.postgresql.org/), [Websocket](https://www.npmjs.com/package/ws)

Có thế khởi chạy dự án bằng 2 cách:

- Khởi chạy thủ công trên môi trường NodeJS
- Khởi chạy sử dụng Docker và Docker compose (Khuyến nghị)

## Clone dự án

```bash
git clone https://github.com/tungsfer512/map_deploy
```

## Khởi chạy dự án sử dụng Docker và Docker compose

### Yêu cầu

- [Docker](https://docs.docker.com/get-docker/)
- [Docker compose](https://docs.docker.com/compose/install/)

### Cài đặt

#### Build

```bash
docker compose build
```

#### Khởi chạy dự án

```bash
docker compose up -d
```

Sau khi khởi chạy dự án, cần đợi postgres container khởi động xong, sau đó restart lại container `backend` để kết nối tới database. Lúc này dự án vẫn chưa có dữ liệu, để khởi tạo dữ liệu mẫu, chạy lệnh sau:

```bash
docker exec -i db psql -U postgres map_db < db/db_postgres.sql
```

#### Dừng dự án

```bash
docker compose down
```

## Khởi chạy dự án thủ công trên môi trường NodeJS

### Yêu cầu

- [NodeJS](https://nodejs.org/en/) phiên bản 12 trở lên
- [PostgreSQL](https://www.postgresql.org/) phiên bản 12 trở lên

### Cài đặt

#### Backend

- Cài đặt các thư viện cần thiết

```bash
cd backend
npm install
```

- Sửa nội dung file `backend/.env` để phù hợp với môi trường
- Tạo database với tên giống với tên được đặt trong file `backend/.env`
- Tạo các bảng trong database:

```bash
npm run setupdb
```

- Tạo dữ liệu mẫu trong database với file `db/db_postgres.sql`

- Khởi chạy server (Development)

```bash
npm run dev
```

- Khởi chạy server (Production)

```bash
npm start
```

#### Frontend

- Cài đặt các thư viện cần thiết

```bash
cd frontend
npm install
```

- Sửa đường dẫn đến backend trong file `frontend/src/ultils/axiosApi.js`, `frontend/src/ultils/socketApi.js`
- Khởi chạy

```bash
npm start
```

## Sử dụng

### Database

- Cổng kết nối:
  - Docker container: `7700:5432`
  - Local: `5432`
- Dữ liệu mẫu: `db/db_postgres.sql`

### Backend

- Địa chỉ: [http://localhost:7000](http://localhost:7000)

### Frontend

- Địa chỉ: [http://localhost:7777](http://localhost:7777)

### Tài khoản mặc định khi sử dụng dwux liệu mẫu

<table>
  <thead>
    <tr>
      <th>Role</th>
      <th>Số điện thoại</th>
      <th>Mật khẩu</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Admin</td>
      <td>0123456789</td>
      <td>123456</td>
    </tr>
    <tr>
      <td>Company</td>
      <td>0123456785</td>
      <td>123456</td>
    </tr>
    <tr>
      <td>Company</td>
      <td>0123456786</td>
      <td>123456</td>
    </tr>
    <tr>
      <td>Company</td>
      <td>0123456787</td>
      <td>123456</td>
    </tr>
    <tr>
      <td>Company</td>
      <td>0123456788</td>
      <td>123456</td>
    </tr>
    <tr>
      <td>Company</td>
      <td>0123456779</td>
      <td>123456</td>
    </tr>
    <tr>
      <td>Driver</td>
      <td>0123456780</td>
      <td>123456</td>
    </tr>
    <tr>
      <td>Driver</td>
      <td>0123456781</td>
      <td>123456</td>
    </tr>
    <tr>
      <td>Driver</td>
      <td>0123456782</td>
      <td>123456</td>
    </tr>
    <tr>
      <td>Driver</td>
      <td>0123456783</td>
      <td>123456</td>
    </tr>
    <tr>
      <td>Driver</td>
      <td>0123456784</td>
      <td>123456</td>
    </tr>
  </tbody>
</table>
