def remove_duplicates(array):
    # Sort the array
    sorted_array = sorted(array)
    # Initialize an empty list to store unique elements
    unique_set = []
    
    # Iterate through the sorted array
    for i in range(len(sorted_array)):
        # Add the element if it's the first element or different from the previous one
        if i == 0 or sorted_array[i - 1] != sorted_array[i]:
            unique_set.append(sorted_array[i])
    
    return unique_set