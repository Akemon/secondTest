package com.hk.service;

import com.hk.bean.User;
import com.hk.bean.UserExample;
import com.hk.dao.UserMapper;
import org.omg.Messaging.SYNC_WITH_TRANSPORT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserMapper userMapper;

    /**
     * 获取所有用户
     * @return 保存用户对象的List
     */
    public List<User> getAllUsersWithSearch(String searchString) {
        return userMapper.selectAllUserWithDept(searchString);

    }

    /**
     * 添加用户
     * @param  user
     */
    public boolean addUser(User user) {
       int flag= userMapper.insertSelective(user);
     //  System.out.println(flag);
       if(flag!=0) return true;
       return false;
    }

    /**
     * 查看用户名是否重复
     * @param loginName
     * @return
     */
    public boolean checkLoginName(String loginName) {
        UserExample userExample =new UserExample();
        UserExample.Criteria criteria= userExample.createCriteria();
        criteria.andLoginNameEqualTo(loginName);
        long count =userMapper.countByExample(userExample);
        return count==0;
    }

    /**
     * 通过 ID获取该用户的详细信息
     * @param id
     * @return
     */
    public User getUser(Integer id) {
        User user =userMapper.selectByPrimaryKey(id);
        return user;
    }

    public void updateUser(User user) {
       userMapper.updateByPrimaryKeySelective(user);

    }

    /**
     * 删除用户
     * @param id
     * @return
     */
    public boolean deleteUser(Integer id) {
        int flag =userMapper.deleteByPrimaryKey(id);
        System.out.println("deleteflag:"+flag);
        if(flag!=0) return true;
        return false;
    }

    /**
     * 匹配用户名与密码
     * @param user
     * @return
     */
    public boolean matchUser(User user) {
        UserExample userExample =new UserExample();
        UserExample.Criteria criteria= userExample.createCriteria();
        criteria.andLoginNameEqualTo(user.getLoginName());
        criteria.andLoginPassEqualTo(user.getLoginPass());
        long count =userMapper.countByExample(userExample);
        System.out.println("count:"+count);
        return count!=0;
    }
}
