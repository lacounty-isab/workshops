# AWK script for summarizing logins.
#
# Invoke this script with logins.txt as
#
#   awk -f loginSummary logins.txt
#
FNR>1 {
  name = $4 ", " $3
  login[name]++
}

END {
  for (name in login)
    printf "%-20s %d\n", name, login[name]
}
