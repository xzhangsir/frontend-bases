
创建分支 git branch (分支名)

切换分支 git checkout (分支名)

删除分支 git branch -d (分支名)

重命名分支 git branch -M (分支名)

获取当前分支下的文件 git pull origin (分支名)

合并某个分支到当前分支 git merge (某个分支名)

本地仓库和远程仓库关联 git remote add origin <url>

将本地的 master 分支提交到远程的 TS 分支 git push origin master:TS

获取远程仓库指定的分支数据 git clone -b 分支名称 url

暂存区与版本区保持一致 git reset HEAD <file>

暂存区覆盖工作区的内容 git checkout <file>

删除暂存区文件 git rm <file> [--cached]

恢复版本区指定版本的内容到工作区 git reset --hard <version>

查看引用版本号 git reflog

拉取远程tag  git fetch origin --prune-tags

基于v1.0.0创建一个分支并切换过来 git checkout -b release-1.0 v1.0.0

查看远程tag  git ls-remote -t  

删除本地tag  git tag -d v3.0.0

删除远程tag  git push -d origin v3.0.0

git add . 和 git commit -m "" 可以合并为 git commit -a -m ""

保存当前未 commit 的代码 git stash [save "备注的内容"]

使用刚保存 stash 的代码  git stash apply
