# Experiment 4 - length of a string (text equivalent of the RAPTOR flowchart)
s = input('Enter the string: ')
count = 0
for _ in s:          # Loop symbol: visit every character
    count += 1       # Assignment symbol: count <- count + 1
print('Length of the string =', count)   # Output symbol
