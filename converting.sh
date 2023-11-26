# all the various package.jsonnes
function allPackageNames {
  for pj in $(\
    find . -name '*node_modules*' -prune -o -name 'package.json'|\
    grep -v node_modules\
  ); do
    echo "$pj -> $(grep '"name":' $pj | gsed -e 's/\s\+"name": "\(.*\)",/\1/')"
  done
}

# ./target/src/package.json -> antlr4ts
# ./package.json -> antlr4ts-root
# ./tool/test/org/antlr/v4/test/runtime/typescript/package.json -> antlr4ts-test
# ./tool/target/test-classes/org/antlr/v4/test/runtime/typescript/package.json -> antlr4ts-test
# ./tool/package.json -> antlr4ts-cli


# TODO - has this goofed up the solution files?
# antlr4ts.njsproj
# antlr4ts.sln
