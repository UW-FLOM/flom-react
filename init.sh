#! /bin/bash
# Posgresql password generator
if grep -q PASSWORD .env; then
        echo "key found"
else
        echo "New Key!"
        echo "PASSWORD="$(openssl rand -base64 64) > .env
fi

# SSH key generator
mkdir -p ./secret && cd ./secret
if [ -f "id_rsa_pub.pem" ]; then
    echo "Already initialized, skipping."
else
    ssh-keygen -t rsa -b 4096 -m PEM -f id_rsa_priv.pem -q -N ""
    # Don't add passphrase
    openssl rsa -in id_rsa_priv.pem -pubout -outform PEM -out id_rsa_pub.pem
    rm id_rsa_priv.pem.pub
    echo "Key initialized."
fi