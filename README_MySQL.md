# Map

Các công nghệ được sử dụng trong dự án: [ExpressJS](https://expressjs.com/), [ReactJS](https://react.dev/), [Material UI](https://mui.com/), [MySQL](https://www.mysql.com/), [Websocket](https://www.npmjs.com/package/ws)

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

Sau khi khởi chạy dự án, lúc này dự án vẫn chưa có dữ liệu, để tạo dữ liệu mẫu, chạy lệnh sau:

```bash
exec -i mysql_db_map mysql -uroot -ppassword map_ws_dev < backend/src/db/map.sql
```

#### Dừng dự án

```bash
docker compose down
```

## Khởi chạy dự án thủ công trên môi trường NodeJS

### Yêu cầu

- [NodeJS](https://nodejs.org/en/) phiên bản 12 trở lên
- [MySQL](https://www.mysql.com/) phiên bản 8 trở lên

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

- Tạo dữ liệu mẫu trong database với file `backend/src/db/map.sql`

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

- Cổng kết nối: `3308`

### Backend

- Địa chỉ: [http://localhost:7000](http://localhost:7000)

### Frontend

- Địa chỉ: [http://localhost:7777](http://localhost:7777)
