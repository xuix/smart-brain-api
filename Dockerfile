FROM node:14.15.3


WORKDIR /usr/src/smart-brain-api
COPY ./ ./
RUN npm install
RUN echo '##About to install bcryt'
# need to install bcrtpt in unix 
RUN npm install bcrypt
RUN npm install nodemon

#EXPOSE 3000

CMD [ "/bin/bash" ]