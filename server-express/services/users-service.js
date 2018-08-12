const User = require('../data/User')

const countUserAsync = async (search) => {
    let query = User.count({})

    if (search) {
        query = query.or([
            { email: new RegExp(search, 'i') },
            { username: new RegExp(search, 'i') }
        ])
    }

    return await query
}

const createUserAsync = async (data) => {
    return await User.create(data)
}

const deleteUserAsync = async (id) => {
    let user = await getUserByIdAsync(id)

    await user.remove()
}

const editUserAsync = async (id, data) => {
    let user = await getUserByIdAsync(id)

    await user.update(data)
}

const getAllUsersAsync = async (countUsers, search, page, pageSize) => {
    let query = User.find({})

    if (search) {
        query = query
            .where({ email: new RegExp(search, 'i') })
            .or({ username: new RegExp(search, 'i') })
    }

    const skip = (page - 1) * pageSize
    if (countUsers > skip) {
        query = query
            .skip((page - 1) * pageSize)
    }

    query = query
        .limit(pageSize)
        .select('_id email username')

    return await query
}

const getUserByIdAsync = async (id) => {
    return await User
        .findById(id)
        .select('-hashedPass -salt')
}

const getUserByUsernameAsync = async (username) => {
    return await User
        .findOne({ 'username': username })
}

const isEmailTaken = async (email) => {
    return await User
        .count({ 'email': email }) > 0
}

const isUsernameTaken = async (username) => {
    return await User
        .count({ 'username': username }) > 0
}

module.exports = {
    countUserAsync,
    createUserAsync,
    editUserAsync,
    deleteUserAsync,
    getAllUsersAsync,
    getUserByIdAsync,
    getUserByUsernameAsync,
    isEmailTaken,
    isUsernameTaken
}
