# Explanation

After reading the problem I noticed that the main problem was merging N sorted arrays and printing them to the console. For this, I just need a way to keep the new values I get somewhat arranged so I can quickly access the data in the manner that I need.

I opted for a **Min Heap** as is the easiest way *(that I could think of)* to accomplish this task.

![https://assets.digitalocean.com/articles/alligator/js/binary-heaps/binary-heap-tree.png](https://assets.digitalocean.com/articles/alligator/js/binary-heaps/binary-heap-tree.png)

Once I got all the data in my **MinHeap** it was just a matter of extracting it while passing it to the printer method!

![https://monophy.com/media/TgxRGWp2XQV8fqcLd5/monophy.gif](https://monophy.com/media/TgxRGWp2XQV8fqcLd5/monophy.gif)
