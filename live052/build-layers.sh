function create_sharp_layer() {
  echo "Cleaning the workspace..."
  rm -rf layers/sharp

  echo "Creating directories..."
  mkdir -p layers/sharp/nodejs

  echo "Installing dependencies..."
  SHARP_VERSION=$(node -e "console.log(require('./package.json').dependencies.sharp)")
  cd layers/sharp/nodejs
  export NODE_ENV=production
  npm init -y
  npm i --cpu=arm64 --os=linux --libc=glibc sharp@$SHARP_VERSION
  rm -rf package.json package-lock.json
}

create_sharp_layer

echo "Layers successfully generated!"