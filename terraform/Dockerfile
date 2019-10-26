FROM hashicorp/terraform

# set working directory inside container image
WORKDIR /app

# copy over terraform files
COPY . /app

# we pass at the moment of building the image the arguments terraform needs to deploy to the proper aws account
ARG region
ARG access_key
ARG secret_key


#  make the aws creds available as env variables. 
ENV AWS_DEFAULT_REGION=$region
ENV AWS_ACCESS_KEY_ID=$access_key
ENV AWS_SECRET_ACCESS_KEY=$secret_key

RUN terraform init
CMD [ "apply" ]
