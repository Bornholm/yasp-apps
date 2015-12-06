#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
OUTPUT_DIR="$DIR/../.cert"

mkdir -p "$OUTPUT_DIR"

openssl genrsa -out "$OUTPUT_DIR/dev-key.pem" 1024
openssl req -new -key "$OUTPUT_DIR/dev-key.pem" -out "$OUTPUT_DIR/dev-csr.pem" -subj "/C=FR/ST=France/L=Paris/O=Yasp/OU=Yasp Team/CN=yasp.local"
openssl x509 -req -in "$OUTPUT_DIR/dev-csr.pem" -signkey "$OUTPUT_DIR/dev-key.pem" -out "$OUTPUT_DIR/dev-cert.pem"
