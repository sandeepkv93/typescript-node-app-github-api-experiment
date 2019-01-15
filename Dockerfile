FROM risingstack/alpine:3.3-v4.2.6-1.1.3

COPY package.json package.json
RUN npm install

# Add your source files
COPY . .
RUN npm build
RUN npm install -g
CMD ["gituser","-u","sandeepkv93"]
