# Use the official Node.js image as the base image
FROM node:19-alpine

ARG NODE_ENV

ENV NODE_ENV=$NODE_ENV

# Set the working directory
WORKDIR /next

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# 安装项目依赖
RUN npm install
RUN npm i --save-dev prisma@latest                 
RUN npm i @prisma/client@latest    
# 将项目文件复制到工作目录
COPY . .

RUN npx prisma generate  
RUN npx run build 

# 暴露 Next.js 应用的默认端口
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
