import { parseStartingHands } from '../utils/input';

const input = `Player 1:
26
14
6
34
37
9
17
39
4
5
1
8
49
16
18
47
20
31
23
19
35
41
28
15
44

Player 2:
7
2
10
25
29
46
40
45
11
50
42
24
38
13
36
22
33
3
43
21
48
30
32
12
27`;

export const data = parseStartingHands(input);
