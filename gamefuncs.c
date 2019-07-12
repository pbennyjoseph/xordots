#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <time.h>

#ifdef _WIN32
void sleep(unsigned int mseconds)
{
	clock_t goal = mseconds + clock();
	while (goal > clock())
		;
}
#endif

int SumNaturalN(int N) {return (N*(N+1)/2);}
int SumNaturalInv(int i) {return floor((1+sqrt(8*i+1))/2);}
int SkipSum(int*x,int i) {int y=0,r;for(r=0;r<i;y+=x[r++]);return y;}

void clear()
{
	#ifdef __linux__
	system("clear");
	#elif _WIN32
	system("cls");
	#else
	system("clear");
	#endif
}
/* Return 0 if any of the gap between the dots is empty */
int EndOfGame(int *f,int n)
{
	int i;
	for(i=0;i<n;i++)
	{
		if(!f[i])
			return 0;
	}
	return 1;
}

void Display(int n,int *c,int *f,int player)
{
	int i,j,k;
	clear();
	for(i=0;i<n;i++)
	{
		printf("%2d ",i+1);
		for(k=1;k++<=n-i;printf(" "));
		for(j=0;j<i+2;j++)
		{
			if(i==*c-1 && j>=c[1]-1 && j<c[2]-1)
			{
				player?printf("\x1b[1;31m"):printf("\x1b[1;32m");
				#ifdef __linux__
				printf("\u2022-");
				#else
				printf("\u2022-");
				#endif
				continue;
			}
			k = (j==i+1?0:f[i*(i+1)/2+j]);
			#ifdef __linux__
			printf("\u2022");
			#else
			printf("\u2022");
			#endif
			printf("\x1b[0m");
			k?printf("-"):printf(" ");
		}
		printf("\n");
	}
}
/* Check if move made is legal
		1 check if row number, start dot, end dot are in range
		2 check if the join of start dot and end dot is valid (i.e not already joined/overlapped)
*/
int IsNotLegal(int *gmstate,int *crp)
{
	int i,j=0,k;
	if(crp[2]<=crp[1] || crp[2]>*crp+1 || crp[1]<1)
		return 1;
	k = crp[0]*(crp[0]-1)/2;
	for(i=k+crp[1];i<k+crp[2];j |= gmstate[i++-1]);
	if(j)
		return 1;
	return 0;
}

/* We find the winning move by the expression XOR(a1,a2,a3,...,an)
where a1,a2,a3... are the number of empty segments
consider the following state
	   • •			0
	  • • •			0 0
	 • • • •		0 0 0		--->	gmstate = [0 0 0 0 0 0 0 1 0 0 0 0 0 1 1]
	• •-• • •		0 1 0 0
       • • • •-•-•		0 0 0 1 1	--->    e = [1 2 3 1 2 3]
   where is the array storing lengths of segments and XOR(e)==0 (i.e. The player who plays this position first loses)
   consider a state where XOR(e)!=0
   then we can always make it zero by decreasing {a single} of the element by {some} amount
   {a single} corresponds to  the segment to be drawn, and
   {some} corresponds to  the length of the segment


E.g.
	   • •			0
	  • • •			0 0			--->	gmstate  = [0 0 0 0 1 0]
	 • •-• •		0 0 0 		---> 	e = [1 2 1 1]
	now we reduce the last '1' to zero and check the XOR of remaining elements
	XOR([1 2 1 0])!=0 Thus leaving this state to the opponent is not winning
			   ^ Index was reduced by '1'
	reset the last move and proceed towards lower index
	XOR([1 2 0 1])!=0
			 ^Index was reduced by '1'
	XOR([1 1 1 1])==0
		   ^Index was reduced by '1'
	We could further reduce this one to zero, but we've already found the solution here.

By the above explanation we clearly have that the player who goes first when (NO_OF_ROWS % 4 == -1) always loses.
(Row no's {3,7,11} always loses for player 1)
*/
void FindWinning(int *f,int *w,int n)
{
	int i,j=0,k=0,xor=0,len=0,seen=0;
	int* e = calloc(2*n,sizeof(int));
	int* loop = calloc(2*n,sizeof(int));
	int* skip = calloc(2*n,sizeof(int));

	for(i=0;i<n;i++)
	{
		for(k=SumNaturalN(i);k<SumNaturalN(i+1);k++)
		{
			if(k-SumNaturalN(i) && SumNaturalN(i+1)-k-1 && f[k] && !f[k-1])
			{
				while (k<SumNaturalN(i+1) && f[k++]);
				k--;
				if(!f[k]) skip[j++]++;
				//continue;
			}
			if(!f[k]) e[j]++;
			
		}
		j++;
	}

	for(i=0;i<j;i++) loop[i]=e[i];
	for(i=0;i<j;xor ^= e[i++]);
	for(i=j-1;i>=0;i--)
	{
		if(!xor) break;
		for(j=1;j<=loop[i];j++)
		{
			xor ^= e[i];
			xor ^= e[i]-j;
			if(!xor)
			{
				w[0] = i-SkipSum(skip,i);
				w[1] = j;
				free(e);
				free(loop);
				free(skip);
				return;
			}
			xor ^= e[i]-j;
			xor ^= e[i];
		}
	}
	free(e);
	free(skip);
	free(loop);
	w[0] = w[1] = -1;
}

/* To play the calculated winning move stored in 'w' (By FindWinning)
	w[0] contains the row no
	w[1] contains the length of the move
*/

void PlayMove(int *gmstate,int *w,int *crp,int n)
{
	int i,row=w[0],j=SumNaturalN(row),k,l=w[1],flag;
	srand(time(0));
	if(w[0]==-1)
	{
		while(1)
		{
			i = rand()%n;
			if(!gmstate[i])
			{
				gmstate[i] = 1;
				k = SumNaturalInv(i);
				i -= k*(k-1)/2-1;
				crp[0] = k;
				crp[1] = i;
				crp[2] = i+1;
				break;
			}
		}
	}
	else
	{
		for(i=0;i<=row-l+1;i++)
		{
			flag=0;
			for(k=0;k<l;k++)
			{
				if(gmstate[i+j+k])
					flag=1;
			}
			if(flag) continue;
			crp[0] = row+1,crp[1] = i+1,crp[2] = i+l+1;
		}
		j = crp[0]*(crp[0]-1)/2;
		for(i=j+crp[1]-1;i<j+crp[2]-1;i++,gmstate[i-1]=1);
		//printf("%d %d %d\n",c[0],c[1],c[2]);
	}
}

/*
gmstate - an array filled with 0's and 1's to represent the pattern in one dimension
	   • •			0
	  • • •			0 0
	 • • • •		0 0 0		--->	gmstate = [0 0 0 0 0 0 0 1 0 0 0 0 0 1 1]
	• •-• • •		0 1 0 0
       • • • •-•-•		0 0 0 1 1
*/
void startgame(int n,int *win,int play)
{
	int i,j,player=0,*test;							//variables for size,loop control and return values
	int *crp = (int *) calloc(3,sizeof(int));		//Current row parameters
	int *gmstate = (int *) calloc(66,sizeof(int));	//Game State memory allocation
	int *winning = (int *) calloc(2,sizeof(int));   //To Store winning move row in index 0 and winning move length in index 1
	Display(n,crp,gmstate,player);					//Display the pattern

	test = realloc(gmstate,sizeof(int)*(SumNaturalN(n)));	//Realloc to required number of rows
	if(!test) return;

	if(play)										//Computer Plays First
	{
		FindWinning(gmstate,winning,n);
		PlayMove(gmstate,winning,crp,n*(n+1)/2);
		Display(n,crp,gmstate,player);
	}

	while(!EndOfGame(gmstate,SumNaturalN(n)))
	{
		printf("Enter next move(row start end): \n");
		i = scanf("%d %d %d",crp+0,crp+1,crp+2);
		if(i!=3)
		{
			crp[0]=crp[1]=crp[2]=0;
			Display(n,crp,gmstate,player);
			printf("Please Enter in specified format\n");
			FLUSH();
			continue;
		}
		if(IsNotLegal(gmstate,crp))
		{
			crp[0]=crp[1]=crp[2]=0;
			Display(n,crp,gmstate,player);			
			printf("Illegal Move\n");
			FLUSH();
			continue;
		}

		Display(n,crp,gmstate,player);
		player ^= 1;

		j = SumNaturalN(crp[0]-1);
		for(i=j+crp[1]-1;i<j+crp[2]-1;i++,gmstate[i-1]=1);	//Save player moves into the gamestate

		FindWinning(gmstate,winning,n);						//Let the computer find the winning move
		if(EndOfGame(gmstate,SumNaturalN(n)))	break;
		PlayMove(gmstate,winning,crp,n*(n+1)/2);

		printf("Computer thinking...\n");			//Wait some time to show computer move
		#if __linux__
		system("sleep 1");
		#elif _WIN32
		sleep(1000);
		#else
		sleep(1000);
		#endif

		Display(n,crp,gmstate,player);
		player ^= 1;								//Toggle Player
	}
	*win = player;									//In case of End of Game flag the winning player and return
	free(crp);
	free(gmstate);
	free(winning);
}
