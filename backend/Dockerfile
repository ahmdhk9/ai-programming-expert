FROM node:20-alpine

WORKDIR /app

# نسخ ملفات الـ package وتثبيت الاعتماديات
COPY package*.json ./
RUN npm install --production

# نسخ باقي الملفات
COPY . .

# تحديد الـ port
ENV PORT=3000
EXPOSE 3000

# أمر تشغيل السيرفر
CMD ["npm", "start"]
