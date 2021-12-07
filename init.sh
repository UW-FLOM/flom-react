mkdir -p secret && cd secret
FILE=id_rsa_pub.pem
if [ -f "$FILE" ]; then
    echo "Already initialized, skipping."
else
    ssh-keygen -t rsa -b 4096 -m PEM -f id_rsa_priv.pem -q -N ""
    # Don't add passphrase
    openssl rsa -in id_rsa_priv.pem -pubout -outform PEM -out id_rsa_pub.pem
    rm id_rsa_priv.pem.pub
    echo "Key initialized."
fi
