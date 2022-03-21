# เว็บจองคิวร้านอาหาร

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## วิธีการใช้งาน

### 1. `yarn global add json-server`

ลง `json-server` ก่อนจะเริ่มต้นนะครับ

### 2. `yarn install`

เพื่อลง dependencies (recommended node version >= 16)

### 3. `yarn run server`

เพื่อเปิด `json-server` database ผมตั้งค่าไว้ที่ port 8000

### 4. `yarn start`

เพื่อเปิดโปรเจคนี้ครับ [http://localhost:3000](http://localhost:3000)

## ผู้ใช้งาน

ผู้ใช้งานมี 3 ระดับ

1. user: ใช้จองคิวได้ทั่วไป
2. owner: จองคิวได้ และจัดการคิวร้านตัวเองได้
3. admin: เข้าถึงฐานข้อมูลทั้งหมด

### ตัวอย่างผู้ใช้งานจากฐานข้อมูล

#### User

```
username: test
password: test
```

#### Owner

```
username: test_owner
password: 123
```

#### Admin

```
username: admin
password: admin
```
