FROM node:18
WORKDIR /app
ENV VITE_API_URL=${VITE_API_URL}
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
