    #!/usr/bin/env sh

    # abort on errors
    set -e

    # build
    npm run build

    # navigate into the build output directory
    cd dist

    # place .nojekyll to bypass Jekyll processing
    echo > .nojekyll

    # if you are deploying to a custom domain
    # echo 'www.example.com' > CNAME

    git init
    git checkout -B main
    git add -A
    git commit -m '新增商品'

    # if you are deploying to https://panduola666.github.io
    # git push -f git@github.com:panduola666/panduola666.github.io.git main

    # if you are deploying to https://panduola666.github.io/2023-Vue3-Eastern-Tea-Aroma
     git push -f https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma.git main:gh-pages

    cd -