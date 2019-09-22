### 创建版本库
```nginx
mkdir git
cd git
pwd
git init
```
### 文件添加到版本库

```nginx
git add git.md 或 git add *
```
```nginx
git commit -m "fix:new git" ##-m后面输入的是本次提交的说明
```

### 版本回退
- 查看提交日志
`git log`命令显示从最近到最远的提交日志，输出的信息太多可以加上`--pretty=oneline`参数
```nginx
git log --pretty=oneline
```
- `git reset`回退版本，上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100
```nginx
git reset --hard HEAD^
```
回退到指定版本号
```nginx
git reset --hart acb0111
```
查看文件`cat git.md`
- 命令窗口关闭后查看之前的版本
```nginx
git reflog
```
### 管理文件
- 查看状态
```nginx
git status
```
- 用`git diff HEAD -- git.md`命令可以查看工作区和版本库里面最新版本的区别
- 撤销修改
```nginx
git checkout -- git.md
```
命令git checkout -- git.md意思就是，把git.md文件在工作区的修改全部撤销，这里有两种情况：
一种是git.md自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
一种是git.md已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。
总之，就是让这个文件回到最近一次git commit或git add时的状态。

- 撤销暂存区修改
```nginx
git reset HEAD git.md
```
- 删除文件
有两个选择，一是确实要从版本库中删除该文件，那就用命令git rm删掉，并且commit：
```nginx
$ git rm test.txt
rm 'test.txt'
$ git commit -m "remove test.txt"
```
现在，文件就从版本库中被删除了。
另一种情况是删错了，因为版本库里还有呢，所以可以很轻松地把误删的文件恢复到最新版本：
```nginx
git checkout -- test.txt
```
### 分支管理
1. 创建分支
   首先，我们创建dev分支，然后切换到dev分支：

```nginx
git checkout -b dev
```
git checkout命令加上-b参数表示创建并切换，相当于以下两条命令：
```nginx
git branch dev
git checkout dev
```
然后，用git branch命令查看当前分支：
```nginx
$ git branch
* dev
  master
```
修改内容，然后提交
```nginx
$ git add git.md
$ git commit -m "fix:add fz"
```
现在把dev分支的工作成果合并到master分支上：
```nginx
$ git merge dev
更新 acb0111..221ba84
Fast-forward
 git.md | 1 +
 1 file changed, 1 insertion(+)
```
合并完成后，就可以放心地删除dev分支了：
```nginx
git branch -d dev
```

#### 小结
Git鼓励大量使用分支：
查看分支：git branch
创建分支：git branch name
切换分支：git checkout name
创建+切换分支：git checkout -b name
合并某分支到当前分支：git merge name
删除分支：git branch -d name

2. 解决冲突
准备新的feature1分支，继续我们的新分支开发：
```nginx
git checkout -b featuer1
```
修改文件
在分支feature1上提交
```nginx
git add git.md
git commit -m "fix:add feature1"
```
切换到master分支：
```nginx
git checkout master
```
在master分支上把git.md文件改下后提交
```nginx
git add readme.txt 
git commit -m "fix:modif"
```
这种情况下，Git无法执行“快速合并”，只能试图把各自的修改合并起来，但这种合并就可能会有冲突，我们试试看：
```nginx
git merge feature1
```
果然冲突了！Git告诉我们，git.md文件存在冲突，必须手动解决冲突后再提交。git status也可以告诉我们冲突的文件
修改好后再次提交
```nginx
$ git add readme.txt 
$ git commit -m "conflict fixed"
```
用带参数的git log也可以看到分支的合并情况：
```nginx
$ git log --graph --pretty=oneline --abbrev-commit
*   7a9298f (HEAD -> master) conflict fixed
|\  
| * 9b72a1c (feature1) fix:add feature1
* | 22d995c fix:modif
* | c7c1c61 fix:modif
* | 62d278a (origin/master) fix:new fz
|/  
...
```
现在，删除feature1分支：
```nginx
git branch -d feature1
```

3. 分支管理策略
合并dev分支，请注意--no-ff参数，表示禁用“Fast forward”：
```nginx
$ git merge --no-ff -m "merge with no-ff" dev
Merge made by the 'recursive' strategy.
 git.md | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```
因为本次合并要创建一个新的commit，所以加上-m参数，把commit描述写进去。
用git log看看分支历史：
```nginx
$ git log --graph --pretty=oneline --abbrev-commit
*   f622aca (HEAD -> master) merge with no-ff
|\  
| * 7f033d5 (dev) fix:rm bbb
|/  
*   7a9298f conflict fixed
...
```

4. Bug分支
如果工作到一半需要先修改一个bug，怎么解决？Git还提供了一个`stash`功能，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作：
```nginx
git stash
```
切换到主分支新建个bug分支修改好了，切到主分支合并然后删除bug分支
```nginx
git checkout master
git merge --no-ff -m "merged bug fix 101" issue-101
```
之后切到工作分支用git stash list命令看看：
```nginx
git stash list
```
工作现场还在，Git把stash内容存在某个地方了，但是需要恢复一下，有两个办法：

一是用git stash apply恢复，但是恢复后，stash内容并不删除，你需要用git stash drop来删除；

另一种方式是用git stash pop，恢复的同时把stash内容也删了：
```nginx
git stash pop
```
你可以多次stash，恢复的时候，先用git stash list查看，然后恢复指定的stash，用命令：
```nginx
git stash apply stash@{0}
```

5. Feature
6. 多人协作
7. [Gitflow工作流](https://blog.csdn.net/chaiyu2002/article/details/80945211)
https://lvwzhen.gitbooks.io/git-tutorial/index.html
